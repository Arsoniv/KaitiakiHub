<script lang="ts">
    import {pb} from '$lib/pocketbase';

    let email = '';
    let password = '';
    let errorMessage = '';

    async function handleLogin() {
        try {
            await pb.collection("users").authWithPassword(email, password); // logs user in with provided information

            window.location.href = "/"; //redirect to the home page

        } catch (error) {
            console.log(error);
        }
    }
</script>

<svelte:head>
    <title>Login - KaitiakiHub</title>
</svelte:head>

<div class="max-w-sm mx-auto mt-10 mb-10 p-6 bg-gray-900 shadow-lg rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Login</h2>

    {#if errorMessage}
        <p class="text-red-500 text-sm">{errorMessage}</p>
    {/if}

    <form on:submit|preventDefault={handleLogin}>
        <div class="mb-4">
            <label for="email" class="block text-sm">Email</label>
            <input type="email" id="email" bind:value={email} class="w-full p-3 border rounded-lg text-black" placeholder="Email" required />
        </div>

        <div class="mb-4">
            <label for="password" class="block text-sm">Password</label>
            <input type="password" id="password" bind:value={password} class="w-full p-3 border rounded-lg text-black" placeholder="Password" required />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
            Login
        </button>
    </form>

    <div class="mt-4 text-center text-sm">
        <p>Don't have an account? <a href="/signup" class="text-blue-600">Sign up</a></p>
    </div>
</div>
