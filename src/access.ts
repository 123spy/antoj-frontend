/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.UserVO } | undefined) {
  const {currentUser} = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 'admin',
    canUser: currentUser && currentUser.userRole === 'user',
    ban: currentUser && currentUser.userRole === 'ban',
  };
}
