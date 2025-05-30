import {pb} from "$lib/pocketbase";
import {error} from '@sveltejs/kit';

import type {PageLoad} from './$types';

type Post = {
	id: string;
	userId: string;
	title: string;
	body: string;
	user: string;
}

//returns a promise type
const getPosts = async (): Promise<Post[]> => {
	const allPosts = await pb.collection('posts').getFullList();
	console.log('allposts', allPosts);

	//let all child promises resolve ( for the id and name)
	return await Promise.all(
		allPosts.map(async post => ({
			user: (await pb.collection('users').getOne(post.poster)).name,
			userId: (await pb.collection('users').getOne(post.poster)).id,
			title: post.title,
			body: post.body,
			id: post.id,
		}))
	);
};

export const load: PageLoad = async () => {
	try {
		const posts = getPosts(); // not using await because I want it to parse a promise type to the page, that way the page won't wait for the posts to be fetched
		return { posts: posts };
	} catch (err) {
		throw error(500, 'Failed to load posts');
	}
};