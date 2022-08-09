type User = {
  name: string,
  email: string,
  profile_picture: string | null
}

type GetUser = {
  token: string | null,
  user: User | null
}

export const getUser = (): GetUser => {
  const user: GetUser =  {
    token: null,
    user: null
  }

  if (typeof window === 'undefined') {
    return user
  }

  if (localStorage.getItem('token') && localStorage.getItem('user')) {
    const token = localStorage.getItem('token')
    const checkUser = localStorage.getItem('user')
    let user = null

    if(checkUser !== null){
      user = JSON.parse(checkUser)
    }

    return { token, user }
  }
  
  return user
}