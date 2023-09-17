import SecondHalfInfo from "./SecondHalfInfo";
import FirstHalfInfo from "./FirstHalfInfo";

const MainInfo = ({ fixture }) => {
  const firstHalfEvents = fixture.events.filter(
    (event) => event.time.elapsed <= 45
  );
  const secondHalfEvents = fixture.events.filter(
    (event) => event.time.elapsed > 45
  );

  return (
    <div className="grid grid-cols-1 text-center text-white">
      <header className="bg-slate-800 text-center">
        <h2>
          First Half{" "}
          {fixture.score.halftime.home !== null && (
            <span>
              [{fixture.score.halftime.home} - {fixture.score.halftime.away}]
            </span>
          )}
        </h2>
      </header>
      {fixture.events.length === 0 ? (
        <span className="m-5"> - </span>
      ) : (
        <FirstHalfInfo
          firstHalfEvents={firstHalfEvents}
          teams={fixture.teams}
        />
      )}

      {(fixture.fixture.status.long === "Second Half" ||
        fixture.fixture.status.short === "FT") && (
        <header className="bg-slate-800 text-center my-0.5">
          <h2>
            Second Half{" "}
            {fixture.score.fulltime.home !== null ? (
              <span>
                [{fixture.score.fulltime.home - fixture.score.halftime.home} -
                {fixture.score.fulltime.away - fixture.score.halftime.away}]
              </span>
            ) : (
              <span>
                [{fixture.goals.home - fixture.score.halftime.home} -{" "}
                {fixture.goals.away - fixture.score.halftime.away}]
              </span>
            )}
          </h2>
        </header>
      )}

      {secondHalfEvents.length > 0 ? (
        <SecondHalfInfo
          secondHalfEvents={secondHalfEvents}
          teams={fixture.teams}
        />
      ) : (
        <span className="m-5"> - </span>
      )}
    </div>
  );
};

export default MainInfo;
