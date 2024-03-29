import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import MainFixtureDetails from "../../components/MainFixturePageInfo/MainFixtureDetails";
import MainFixtureHeader from "../../components/MainFixturePageInfo/MainFixtureHeader";
import SecNavbar from "../../components/Navbar/SecNavbar";
import useDatePicker from "../../hooks/useDatePicker";
import filterFixturesByDate from "../../utils/fixturesHandling/filterFixturesByDate";
import filterFixturesByFavTeam from "../../utils/fixturesHandling/filterFixturesByFavTeam";

const ScheduledPage = ({
  otherFixtures,
  favTeam,
  isToggleChecked,
  handleToggleChange,
}) => {
  const { dateInput, handleDateInputChange } = useDatePicker();

  const scheduledFixtures = otherFixtures?.response
    ?.filter((fixture) => fixture.fixture.status.short === "NS")
    .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));

  const filteredFixturesByDate = filterFixturesByDate(
    scheduledFixtures,
    dateInput.startDate,
    dateInput.endDate
  );

  const filteredFixturesByFavTeam = filterFixturesByFavTeam(
    scheduledFixtures,
    dateInput.startDate,
    dateInput.endDate,
    favTeam
  );

  return (
    <>
      <SecNavbar
        isToggleChecked={isToggleChecked}
        handleToggleChange={handleToggleChange}
        dateInput={dateInput}
        handleDateInputChange={handleDateInputChange}
      />
      {otherFixtures === null ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 text-white font-ox">
          {(isToggleChecked
            ? filteredFixturesByFavTeam
            : filteredFixturesByDate
          ).map(([date, fixtures]) => (
            <main key={date}>
              <h2
                className="bg-slate-700 py-1 pl-2 
              text-white 
              text-left
              text-lg 
              w-full"
              >
                {date}
              </h2>
              {fixtures.map((fixture) => {
                const date = new Date(fixture.fixture.date);
                const time = date.toLocaleTimeString("en-SG", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <Link
                    to={`/scheduled/${fixture.fixture.id}`}
                    key={fixture.fixture.id}
                  >
                    <div className="bg-slate-900">
                      <MainFixtureHeader fixture={fixture} />

                      <div className="w-full flex p-1">
                        <div className="w-[10%] flex flex-col justify-center items-center text-center">
                          {time}
                        </div>
                        <MainFixtureDetails fixture={fixture} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </main>
          ))}
        </div>
      )}
    </>
  );
};

export default ScheduledPage;
