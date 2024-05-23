import axios from 'axios';

const journalApi = axios.create({
      baseURL:'https://view-demos-c8014-default-rtdb.europe-west1.firebasedatabase.app'
});
export default journalApi;