import axios from "../helpers/axiosInstance";

export const getUserProfileData = async (userId) => {
  try {
    const { data } = await axios().post("/getProfile", { user_id: userId });

    if (data.status === 200) {
      console.log(data);
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const updateUserProfile = async (profileData) => {
  console.log(profileData);

  let formData = new FormData();
  formData.append("userPicture", profileData.userPicturePath);
  formData.append("civilIdPicture", profileData.civilIdPicturePath);
  formData.append("userProfile", JSON.stringify({ userId: profileData.userId, userName: profileData.userName, 
    email: profileData.email, telephone: profileData.telephone, civilId: profileData.civilId }));
  try {
    const { data } = await axios().post("/updateProfile ", formData , {
      headers: {
        "Content-Type": "multipart/form-data; charset=utf-8; application/json",
      },
    })
   
    console.log(data);
  } catch (error) {
    return error;
  }
};

export const updateNewPassword = (userId, passwordDetails) => {
  try {
    axios()
      .put("/updatePassword", {
        userid: userId,
        newpassword: passwordDetails.newPassword,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};