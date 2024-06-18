
// component--------------
import SplitScreen from "../layout/SplitScreen"
import GameActiveContainer from "../app/components/GameActiveArea/GameActiveContainer";
import MessageContainer from "../app/components/GameMessage/MessageContainer"
import StatsContainer from "../app/components/GameStats/StatsContainer";
import ModelLayout from "../layout/ModelLayout";
import MenuContainer from "../app/components/GameMenu/MenuContainer";

export default function Home(){
    return(
        <>
           <ModelLayout>
             <MenuContainer/>
           </ModelLayout>
           <SplitScreen>
              <StatsContainer/>
              <MessageContainer/>
              <GameActiveContainer/>
           </SplitScreen>
        </>
    )
}