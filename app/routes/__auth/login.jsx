import { Form } from '@remix-run/react';
// import {redirect} from 'remix'
import { MakaraIcon } from '~/components/icons/MakaraIcon'

function validateUsername(username) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Username must be at least 3 characters'
  }
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters'
  }
}

function badRequest(data) {
  return json(data, { status: 400 })
}

// export const action = async ({ request }) => {
//   const form = await request.formData()
//   const username = form.get('username')
//   const password = form.get('password')

//   const fields = { username, password }

//   const fieldErrors = {
//     username: validateUsername(username),
//     password: validatePassword(password),
//   }

//   // If one of the fields is wrong return
//   if (Object.values(fieldErrors).some(Boolean)) {
//     return badRequest({ fieldErrors, fields })
//   }
//   // Make request to auth on the api server
//   // const user = await login({ username, password })

//   // return redirect('/login')
// }

export const action = async ({ request, context }) => {
  // call my authenticator
  const resp = await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    throwOnError: true,
    context,
  });
  console.log(resp);
  return resp;
};

export default function Login() {
  // const actionData = useActionData()

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='w-full m-auto pt-28 flex flex-grow justify-center'>

        <Form
          method='post'
          action='/login'
          className='flex flex-col items-center p-8 max-w-sm w-full text-base text-black'
        >
          <div className='p-4 flex justify-center'>
            <MakaraIcon size={200} />
          </div>

          <div id='formError'></div>

          {/* <h1>Log in to your account.</h1> */}
          <div className='h-4'></div>
          <input
            name="username"
            placeholder="Username"
            type="text"
            id="username"
            autocomplete="username"
            autocapitalize="off"
            autocorrect="off"
            className='w-full h-12 px-3 mt-4 border-4 focus-ring rounded-lg border-blue-900'
            dir="auto"
            value="">
          </input>

          <input
            name="password"
            type="password"
            placeholder="Password"
            autocapitalize="off"
            autocorrect="off"
            autocomplete="current-password"
            id="current-password"
            className='w-full h-12 px-3 mt-4 border-2 focus-ring rounded-lg text-black border-black focus:border-blue-800'
            dir="auto"
            value="">
          </input>

          {/* <input type="email" autofocus="" aria-describedby="success-message" id="email-address" name="email" autocomplete="email" required="" placeholder="Email address" class="placeholder-gray-500 dark:disabled:text-blueGray-500 focus-ring px-11 py-8 w-full text-black disabled:text-gray-400 dark:text-white text-lg font-medium bg-gray-100 dark:bg-gray-800 rounded-lg" value=""></input> */}

          <button
            type='submit'
            className='w-full h-12 px-5 mt-4 rounded-lg bg-black text-white text-lg'
          >
            Log in
          </button>

          <div className='mt-4'>
            Forgot password?
          </div>

          <div className='mt-4'>
            No account?Create one

          </div>
        </Form>
      </div>

    </div>
    // <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-md w-full space-y-8">
    //     <div>
    //       <MakaraIcon size={200} />
    //       <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">Sign in to your account</h2>
    //     </div>
    //     <Form
    //       action='/login'
    //       method='POST'
    //       className="mt-8 space-y-6"
    //     >
    //       <input type="hidden" />
    //       <div className="rounded-md shadow-sm -space-y-px">
    //         <div>
    //           <label htmlFor="username" className="sr-only">
    //             Username
    //           </label>
    //           <input
    //             type="text"
    //             id="username"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             required
    //             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //             placeholder="Username"
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="password" className="sr-only">
    //             Password
    //           </label>
    //           <input
    //             id="password"
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //             placeholder="Password"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <button
    //           type="button"
    //           onClick={handleLogin}
    //           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

    //         >
    //           Sign in
    //         </button>
    //       </div>
    //     </Form>
    //     <div className="border-zinc-200 border-2 rounded h-16 flex items-center place-content-center">
    //       No account?
    //       <Link to="/sign-up" className="pl-3 text-indigo-700">Create one</Link>
    //       <div>.</div>
    //     </div>
    //   </div>
    // </div>
  )
}