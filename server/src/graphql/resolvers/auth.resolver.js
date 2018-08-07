export const authenticated = resolver => (parent, args, context, info) => {
	if (context.authUser) {
		return resolver(parent, args, context, info);
	}
	throw new Error('User is not authenticated');
};
