import axios from "axios";

export const GetURL = (newCity: string) => {
  const baseUrl = process.env.REACT_APP_URL;
  const apiKey = process.env.REACT_APP_KEY;

  return `${baseUrl}key=${apiKey}&q=${newCity}&aqi=no`;
};

export const GetData = async (url: string) => {
  const res: any = await axios.get(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return res?.data;
};
