import * as React from 'react'
import {useFetcher} from '@remix-run/react'

import {Button} from '~/components'
import {Field} from '~/components/Field'
import clsx from 'clsx'

export default function TaskFlagInput({disabled, className}) {
    const fetcher = useFetcher()

    let inputRef = React.createRef()

    return (
        <fetcher.Form
            method='post'
            action='./flag'
            className={clsx('w-full', className)}
        >
            <fieldset
                className='grid grid-col-1 gap-5'
                disabled={fetcher.submission || disabled}
            >
                <Field
                    className='m-0'
                    name='flag'
                    placeholder='STF{s0m3_fl4g}'
                    ref={inputRef}
                    error={fetcher.data?.errors?.flag}
                />
                <Button
                    type='submit'
                    text='Проверить'
                    className="place-self-end w-auto"
                />
            </fieldset>
        </fetcher.Form>
    )
}