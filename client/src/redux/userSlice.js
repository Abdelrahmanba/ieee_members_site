import { createSlice } from "@reduxjs/toolkit"

const initState = {
  user: {},
  token: "",
}

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    signIn: (state, action) => (state = action.payload),
    signOut: (state) => (state = initState),
  },
})

export default userSlice.reducer
export const { signIn, signOut } = userSlice.actions
