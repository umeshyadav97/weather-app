import Image from "next/image"
import WSWICON from "@local/assets/images/wsw.svg"
import UPicon from "@local/assets/images/up.svg"
import DownIcon from "@local/assets/images/down.svg"
import ToggleIcon from "@local/assets/images/toggle.svg"
import moment from "moment"
function TodaysCard({ data }) {
  const sunriseTimestamp = data?.city?.sunrise * 1000
  const sunsetTimestamp = data?.city?.sunset * 1000
  const formattedSunrise = moment(sunriseTimestamp).format("hh:mm A")
  const formattedSunset = moment(sunsetTimestamp).format("hh:mm A")
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pb-3">
        <div className="col-span-2 bg-white rounded-xl mt-4 ">
          <div className="py-4">
            <span className="text-base px-8 py-2 text-gray-400">Wind Status</span>
            <div className="text-3xl py-5 px-8">
              {data?.list?.[0].wind?.speed}
              <span className="text-lg">km/h</span>
            </div>
            <div className="flex flex-row px-8 pb-2">
              <Image src={WSWICON} width={30} height={30} />
              <span className="text-base px-4 flex items-center">WSW</span>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-xl mt-4 ">
          <div className="py-4">
            <span className="text-base px-8 py-2 text-gray-400">Sunrise & Sunset</span>
            <div className="flex flex-row px-8 py-4">
              <Image src={UPicon} width={30} height={30} />
              <span className="text-base px-4 flex items-center">{formattedSunrise}</span>
            </div>
            <div className="flex flex-row px-8 py-2">
              <Image src={DownIcon} width={30} height={30} />
              <span className="text-base px-4 flex items-center">{formattedSunset}</span>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-xl mt-4 ">
          <div className="py-4">
            <span className="text-base px-8 py-2 text-gray-400">Humidity</span>
            <div className="flex justify-between">
              <div className="text-3xl py-5 px-8 ">
                {data?.list?.[0]?.main?.humidity}
                <span className="text-lg">%</span>
              </div>
              <div className="flex items-center pr-5">
                <Image src={ToggleIcon} width={60} height={60} />
              </div>
            </div>
            <div className="flex flex-row px-8 py-2">
              <span className="text-base px-4 flex items-center">Normal</span>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-xl mt-4 ">
          <div className="py-4">
            <span className="text-base px-8 py-2 text-gray-400">Visibility</span>
            <div className="text-3xl py-5 px-8">
              {data?.list?.[0]?.visibility / 1000}
              <span className="text-lg">km</span>
            </div>
            <div className="flex flex-row px-8 py-2">
              <span className="text-base px-4 flex items-center">Average</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodaysCard
