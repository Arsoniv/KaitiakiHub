<script lang="ts">
    import {pb} from '$lib/pocketbase';

    let email = '';
    let password = '';
    let passwordConfirm = '';
    let username = '';

    async function handleSignup() {
        try {
            const user = await pb.collection("users").create({
                email,
                password,
                name: username,
                passwordConfirm
            }); // creates a new user with provided info (conflicting info will be handled by backend)
            console.log(user)

            await pb.collection("users").authWithPassword(email, password); //signs the user in with their new account

            window.location.href = "/"; // redirects the user to the homepage now that they are signed in

        } catch (error) {
            console.log(error); // is there's ever an error in the above signup login it will be logged and there will be no redirect.
        }
    }
</script>

<svelte:head>
    <title>Sign Up - KaitiakiHub</title>
</svelte:head>

<div class="max-w-sm mx-auto mt-10 mb-10 p-6 bg-gray-900 shadow-lg rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Sign Up</h2>

    <form on:submit|preventDefault={handleSignup}>
        <div class="mb-4">
            <label for="email" class="block text-sm">Email</label>
            <input type="email" id="email" bind:value={email} class="w-full p-3 border rounded-lg text-black" placeholder="Email" required />
        </div>

        <div class="mb-4">
            <label for="username" class="block text-sm">Username</label>
            <input type="text" id="username" bind:value={username} class="w-full p-3 border rounded-lg text-black" placeholder="Username" required />
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm">Password</label>
            <input type="password" id="password" bind:value={password} class="w-full p-3 border rounded-lg text-black" placeholder="Password" required />
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm">Confirm Password</label>
            <input type="password" id="password" bind:value={passwordConfirm} class="w-full p-3 border rounded-lg text-black" placeholder="Password (again)" required />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
            Sign Up
        </button>
        <h6 class="mt-2 font-medium opacity-50 italic text-center pb-1 pr-3">By signing up you agree to our <a class="underline text-blue-400" href="/tos">terms of service</a></h6>
    </form>
</div>