import axios from "axios";
import { toJS } from "mobx";
axios.defaults.headers.common["Authorization"] = process.env.REACT_APP_TOKEN;

class TransportLayer {
    async fetchData() {
        const teamsRequest = axios.get(
            process.env.REACT_APP_BASE_URL.concat("/teams")
        );
        const officesRequest = axios.get(
            process.env.REACT_APP_BASE_URL.concat("/offices")
        );
        const membersRequest = axios.get(
            process.env.REACT_APP_BASE_URL.concat("/members")
        );
        let response = await axios
            .all([teamsRequest, officesRequest, membersRequest])
            .then(
                axios.spread((...responses) => {
                    return responses.map((response) => response.data);
                })
            )
            .catch((err) => {
                console.error(err);
            });

        return response;
    }

    async createMember(data) {
        let createdMember = await axios
            .post(process.env.REACT_APP_BASE_URL.concat("/members"), toJS(data))
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                alert(err);
                console.error(err);
            });
        return createdMember;
    }

    async deleteMembers(memberIDs) {
        let deleteQueue = [];
        memberIDs.forEach((memberID) => {
            deleteQueue.push(
                axios.delete(
                    process.env.REACT_APP_BASE_URL.concat("/members/").concat(
                        memberID
                    ),
                    {
                        data: memberID,
                    }
                )
            );
        });

        let result = await axios
            .all(deleteQueue)
            .then(
                axios.spread((...responses) => {
                    return responses.map((response) => response.data);
                })
            )
            .catch((err) => console.log(err));
        return result;
    }
}

const transportLayer = new TransportLayer();

export default transportLayer;
