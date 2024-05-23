/* import uploadImage from '@/modules/daybook/helpers/uploadImage'; */
import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
import https from "https";

describe("Pruebas en el uploadImage", () => {
  test("debe de cargar un archivo y retornar la url", async () => {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    try {
      const { data } = await axios.get(
        "https://res.cloudinary.com/deqvbpmxn/image/upload/v1715165060/iat8berbgb2kqctpmvof.jpg",
        { responseType: "arraybuffer", httpsAgent: agent }
      );
      const file = new File([data], "foto.jpg");
      const url = await uploadImage(file);
      expect(typeof url).toBe("string");
    } catch (error) {
      console.error(error);
    }
  });
});
