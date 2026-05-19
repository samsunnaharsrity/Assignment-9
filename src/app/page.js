import Banner from "./components/banner";
import ChooseStudyNook from "./components/chooseStudyNook";
import StudyRooms from "./components/studyRooms/studyRooms";
import RoomPage from "@/roomPage/page";

export default function Home() {
  return (
      <div>
        <Banner></Banner>
        <RoomPage></RoomPage>
        <ChooseStudyNook></ChooseStudyNook>
      </div>
  );
}
