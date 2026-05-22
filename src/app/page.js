import Banner from "./components/banner";
import ChooseStudyNook from "./components/chooseStudyNook";
import StudyRooms from "./components/studyRooms/studyRooms";
import RoomPage from "@/roomPage/page";
import WhatStudentSay from "./components/whatStudentSay";


export const metadata = {
  title: "StudyNook – Home",
};

export default function Home() {
  return (
      <div>
        <Banner></Banner>
        <RoomPage></RoomPage>
        <ChooseStudyNook></ChooseStudyNook>
        <WhatStudentSay></WhatStudentSay>
      </div>
  );
}
