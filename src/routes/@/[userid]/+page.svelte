<script lang="ts">
    let {data} = $props();

    type User = {
        id: string;
        name: string;
        created: string;
    }
    type Post = {
        id: string;
        userId: string;
        title: string;
        body: string;
        user: string;
    }

    const getFormattedContent = (text: string): string =>
        text.length > 80 ? text.substring(0, 150) + "..." : text; // shorthand method to limit the length to 150 chars

</script>

{#await data.user}
    <p class="text-center opacity-50">Fetching User...</p>
{:then user}
    <div class="flex justify-between">
        <h1 class="font-bold text-4xl">{user.name}</h1>
        <h3 class="opacity-60 mt-2">Account Created: {user.created}</h3>
    </div>
{/await}
<hr class="mt-4 mb-4" />
{#await data.posts}
    <p class="text-center opacity-50">Fetching User's Posts...</p>
{:then posts}
    {#each posts as post}
        <a href="/post/{post.id}" target="_blank">
            <div class="bg-gray-700 p-4 shadow rounded-lg mb-4 hover:bg-gray-600 hover:scale-101 transition-transform ease-in">
                <div class="flex justify-between">
                    <p class="font-semibold text-2xl">{post.title}</p>
                    <p class="font-bold">{post.user}</p>
                </div>

                <p class="opacity-80">{getFormattedContent(post.body)}</p>
            </div>
        </a>
    {/each}
{/await}