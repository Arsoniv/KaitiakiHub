<script>
    import '../app.css';
    import { authData, pb } from "$lib/pocketbase.js";

    const logout = async () => {
        pb.authStore.clear(); // clears the authstore, effectively logging the user out
        console.log('logging out');
        console.log($authData);
    };
</script>

<svelte:head>
    <title>KaitiakiHub</title>
</svelte:head>

<div class="bg-gray-900 text-gray-100 min-h-screen">
    <header class="bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <a href="/"><h1 class="text-3xl font-bold hover:scale-105 transition-transform ease-in">KaitiakiHub</h1></a>
        <div class="flex items-center space-x-4">
            {#if $authData}
                <button class="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 hover:scale-105 transition-transform ease-in cursor-pointer" on:click={logout}>Logout</button>
                <a href="/@/{$authData.id}"><div class="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform ease-in">{$authData.name}</div></a>
            {:else}
                <a href="/login">
                    <button class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 hover:scale-105 transition-transform ease-in">Log In</button>
                </a>
                <a href="/signup">
                    <button class="bg-blue-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-900 hover:scale-105 transition-transform ease-in">Sign Up</button>
                </a>
            {/if}
        </div>
    </header>
    <main class="max-w-6xl mx-auto mt-10 mb-10 p-6 bg-gray-800 shadow-lg rounded-lg min-h-screen">
        <slot></slot> <!-- slot is used to automatically render all child components giving my site more structure-->
    </main>
    <h6 class="font-medium opacity-50 italic text-right pb-2 pr-3 text-white">KaitiakiHub is not responsible for any user-generated content, see our <a class="underline text-blue-400" href="/tos">terms of service</a> for more details, &copy; 2025 KaitiakiHub Team. All rights reserved.</h6>
</div>
