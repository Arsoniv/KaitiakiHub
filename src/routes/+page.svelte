<script lang="ts">
    import type {PageProps} from "./$types";

    let { data }: PageProps = $props();

    const getFormattedContent = (text: string): string =>
        text.length > 80 ? text.substring(0, 150) + "..." : text;

</script>

<section>
    <div class="flex justify-between items-center">
        <div>
            <h2 class="text-4xl font-semibold mb-2">Welcome to KaitiakiHub</h2>
            <p class="text-gray-300 text-2xl">Join the conversation, connect with people, and share your thoughts in real-time.</p>
        </div>
        <a href="/new"><div class="text-4xl bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 hover:scale-105 transition-transform ease-in cursor-pointer">New Post</div></a>
    </div>
    <hr class="mt-4 border-2"/>
    <section class="mt-4 text-2xl text-white">
        <h3 class="text-lg font-semibold mb-4">Recent Posts</h3>

        {#await data.posts}
            <p class="text-center opacity-50">Fetching Latest Posts...</p>
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
    </section>
</section>
