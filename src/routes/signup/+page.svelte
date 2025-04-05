<script lang="ts">
    import {pb} from '$lib/pocketbase';

    let email = '';
    let password = '';
    let passwordConfirm = '';
    let username = '';
    let errorMessage = '';

    async function handleSignup() {
        try {
            const user = await pb.collection("users").create({
                email,
                password,
                username: username,
                passwordConfirm
            });

            await pb.collection("users").authWithPassword(email, password);

            window.location.href = "/";

        } catch (error) {
            console.log(error);
        }
    }
</script>

<svelte:head>
    <title>Sign Up - KaitiakiHub</title>
</svelte:head>

<main class="text-gray-100 min-h-screen">
    <div class="max-w-sm mx-auto mt-10 p-6 bg-gray-900 shadow-lg rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Sign Up</h2>

        {#if errorMessage}
            <p class="text-red-500 text-sm">{errorMessage}</p>
        {/if}

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
        </form>
    </div>
</main>
