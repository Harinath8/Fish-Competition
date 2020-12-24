import axios from "../helpers/axiosInstance";

export const getFishTypes = async () => {
  try {
    const { data: { Status, fishtypes } } = await axios().get("/getFishTypes");
    if (Status === 200) {
      return fishtypes;
    }
    console.log(fishtypes);
  } catch (error) {
    return error;
  }
};

export const createCompetition = async ({ userId, fishTypeId, fishLength, fishPicture }) => {
  let formData = new FormData();
  formData.append("file", fishPicture);
  formData.append("formData", JSON.stringify({ userId, fishTypeId, fishLength }));
  try {
    const { data } = await axios().post("/catchInsert ", formData , {
      headers: {
        "Content-Type":
          "multipart/form-data; charset=utf-8; application/json",
      },
    })
    if (data.Status === 201) {
      return data.Status;
    }
    console.log(data);
  } catch (error) {
    return error;
  }
};
