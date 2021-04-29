const getrecipientsemail = (user,userLoggedIn) => (
   user?.filter(userToFilter => userToFilter!==userLoggedIn?.email)[0]
)
export default getrecipientsemail