import axios from "axios";
import { useQuery } from "react-query";

const fetchByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
export const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () => fetchByEmail(email));
  const channelId = user?.data.channelId;
  const { data: course } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),

    {
      enabled: !!channelId,
    }
  );
  return <div>DependentQueries</div>;
};
