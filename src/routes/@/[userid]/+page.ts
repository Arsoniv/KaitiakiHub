import {pb} from "$lib/pocketbase";
import {error} from '@sveltejs/kit';

import type {PageLoad} from './$types';

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

const getUser = async (userId: string): Promise<User> => {
	const user = await pb.collection('users').getOne(userId);

	return {
		id: user.id,
		name: user.name,
		created: user.created
	};
};

const getPosts = async (userId: string): Promise<Post[]> => {
	const allPosts = await pb.collection('posts').getFullList({filter: `poster = "${userId}"`});

	allPosts.sort((a, b) => b.likes - a.likes);

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

export const load: PageLoad = async ({ params }) => {
	try {
		return { user: getUser(params.userid), posts: getPosts(params.userid) };
	} catch (err) {
		throw error(500, 'Failed to load posts');
	}
};