import axios from "../helpers/axiosInstance";

export const getUserProfileData = async (userId) => {
  try {
    const { data } = await axios().post("/getProfile", { user_id: userId });
    if (data.status === 200) {
      const { data:userPicture } = await axios().get(`/getFishImage/${data.userPicturePath}`, {
        responseType: "blob",
      });
      data.userPicturePath = userPicture;

      const { data:civilIdPicture } = await axios().get(`/getFishImage/${data.civilIdPicturePath}`, {
        responseType: "blob",
      });
      data.civilIdPicturePath = civilIdPicture;
    }
    return data;

    // if (data.status === 200) {
    //   const response = await axios().get(data.userPicturePath, {
    //     responseType: "blob",
    //   });

    //   data.userPicturePath = response.data;

    //   let blob = new Blob([response.data], { type: "image/jpeg" });
    //   var image = document.createElement("img");
    //   image.width = 150;
    //   image.height = 100;
    //   let reader = new FileReader();
    //   reader.addEventListener("loadend", () => {
    //     let contents = reader.result;
    //     image.src = contents;
    //     document.body.appendChild(image);
    //   });
    //   reader.readAsDataURL(blob);

    //   return data;
    // }
  } catch (error) {
    return error;
  }
};

export const updateUserProfile = async (profileData) => {
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