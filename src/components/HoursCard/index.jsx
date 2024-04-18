import moment from "moment"
function HoursCard({ data, formatData, degreeSymbol }) {
  const day_icon = (icon) => {
    return `${"https://openweathermap.org/img/wn/" + icon}@2x.png`
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
        {data?.list?.map((day, index) => (
          <div key={index} className="bg-white rounded-xl mt-4">
            <div className="py-2 flex flex-col items-center justify-center">
              <span className="text-sm">{moment(day.dt_txt).format("hh:mm a")}</span>
              <div>
                <img src={day_icon(day.weather[0]["icon"])} height={100} width={100} alt="img" />
              </div>
              <span className="text-sm">
                {formatData(day.main.temp)}
                {degreeSymbol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HoursCard
