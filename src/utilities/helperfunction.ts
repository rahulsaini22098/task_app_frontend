export type User = {
  name: string,
  email: string,
  profile_picture: string | null
}

export type GetUser = {
  token: string | null,
  user: User | null
}

export const getUser = (): GetUser => {
  const user: GetUser =  {
    token: null,
    user: null
  }

  const userObj = localStorage.getItem('user')

  if (localStorage.getItem('token') !== null &&  userObj!== null) {
    user.token = localStorage.getItem('token')
    user.user = JSON.parse(userObj)
  }
  
  return user
}