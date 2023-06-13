import { Form, useLoaderData, useCatch, useActionData } from '@remix-run/react';
import { json } from '@remix-run/node';
// import { TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { z } from 'zod';
import { useFetcher } from '@remix-run/react';
import { Prisma } from "@prisma/client"

import prisma from '~/utils/prisma.server';
import auth from '~/utils/auth.server';
import { getSession, commitSession } from '~/utils/session.server';
import { validateAction } from '~/utils/utils.server';

import { Field } from '~/components/Field';
import { Button } from '~/components';

export async function loader({ request }) {
	let user = await auth.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	if (!user.team) {
		throw json({ title: 'Missing team' }, { status: 404 })
	}

	let team = await prisma.team.findUniqueOrThrow({
		where: {
			id: user.team.id,
		},
		include: {
			members: {
				select: {
					id: true, name: true
				}
			},
		},
	})

	return json({ team, user })
}

export default function TeamSettingsPage() {
	const { user, team } = useLoaderData();
	const actionData = useActionData();

	// const kickMember = useFetcher();

	return (
		<Form
			method='post'
			reloadDocument
			replace
			className='grid grid-cols-1 gap-5 pt-4'
		>
			<Field
				name='name'
				label='Название команды'
				defaultValue={team.name}
			/>
			<Field
				name='token'
				label='Токен для входа'
				disabled
				value={team.token}
			/>

			{actionData?.errors?.name &&
				(
					<p className='pt-3 text-sm text-red-500 text-center'>
						{actionData.errors?.name}
					</p>
				)
			}
			{user.id == team.captainId
				? (
					<Button
						text='Сохранить'
					/>
				) : null
			}

			<div className='w-full'>
				<h2 className='mb-4'>
					Участники команды
				</h2>
				<table className="w-full table-auto bg-neutral-900 rounded-lg overflow-clip">
					<tbody className=''>
						{team.members.map(function (member, index) {
							return (
								<tr key={member.id} className='h-10 whitespace-nowrap border-b last:border-none  border-white/30 '>
									<td className='px-3'>{index + 1}</td>
									<td className='px-3'>{member.name}</td>
									{member.id == team.captainId
										? (
											<td className='px-3'>
												<StarIcon className='w-5 h-5 text-yellow-500' />
											</td>

										) : null
									}
									{/* {user.id == team.captainId && member.id != user.id
										? (
											<td className='flex justify-end'>
												<kickMember.Form
													method='post'
													reloadDocument
													replace
												>
													<input name='teamMemberId' value={member.id} type='hidden' />
													<Button
														icon={TrashIcon}
														small
													>
													</Button>
												</kickMember.Form>
											</td>
										) : null
									} */}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			{/* <Button
				text='Покинуть команду'
				name='_action'
				value='leave'

			/>

			{user.id == team.captainId
				? (
					<Button
						text='Удалить команду'
						name='_action'
						value='delete'
					/>
				) : null
			} */}
		</Form >
	)
}

export async function action({ request }) {
	const user = await auth.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	if (user.team === null) {
		throw json({ errors: { title: 'Missing team' } }, { status: 404 })
	}

	if (user.id != user.team.captainId) {
		throw json({ errors: { title: 'Only captain can update team name' } }, { status: 403 })
	}

	const schema = z.object({
		name: z.string().min(3, { message: "Must be 3 or more characters long" })
	})
	const { formData, errors } = await validateAction({ request, schema })

	if (errors) {
		return json({ errors }, { status: 400 })
	}

	try {
		let team = await prisma.team.update({
			where: {
				id: user.team.id
			},
			data: {
				name: formData.name,
			},
		})

		user.team.name = team.name

		const session = await getSession(request.headers.get('Cookie'))
		session.set(auth.sessionKey, user)


		return json({ ok: true }, { headers: { 'set-cookie': await commitSession(session) } })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === "P2002") {
				return json({ errors: { name: 'Команда с таким названием уже существует.' } })
			}
		}

		throw e
	}
}



export function CatchBoundary() {
	const errorResponse = useCatch();

	const createTeam = useFetcher();
	const joinTeam = useFetcher();


	if (errorResponse.status === 404) {
		return (

			<div className=''>
				<div className='my-5 '>
					<h1 className='text-lg font-semibold'>Какжется у тебя нет команды.</h1>
					<p className='mt-2'>Создай свою команду или присоединись к существующей.</p>
				</div>
				<createTeam.Form
					method='post'
					action="create"
					className='grid grid-cols-1 gap-5 pt-4'
				>
					<Field
						name='name'
						label='Название команды'
						error={createTeam.data?.errors?.name}
					/>

					<Button
						text='Создать'
					/>
				</createTeam.Form>
				<joinTeam.Form
					method='post'
					action='join'
					className='pt-5 grid grid-cols-1 gap-5'
				>
					<Field
						name='token'
						label='Токен для входа'
						error={joinTeam.data?.errors?.token} />
					<Button
						text="Присоединиться к команде"
						type="submit"
					/>
				</joinTeam.Form>
			</div>
		)
	}

	throw new Error(`Unhandled error: ${errorResponse.status} `)
}