// how come we don't need to wrap renderGathering in a function?
import { onSubmitAttendance } from "./gatheringList.controller.js";
export function renderGatheringList(gatherings, container) {
    container.innerHTML = `<div>
            ${gatherings.map(renderGathering).join("\n")}
        </div>`;
    container
        .querySelectorAll("form")
        .forEach((form) => form.addEventListener("submit", onSubmitAttendance));
}
function renderGathering(gathering) {
    return `
          <p class="gatheringElements"><span>Title:</span> ${gathering.title}</p>
        <p>Duration: ${gathering.durationInHours} ${gathering.durationInHours === 1 ? "hour" : "hours"}.</p>
        <p> Location: ${gathering.location}.</p>
        <p> Organizer: ${gathering.organizer}.</p>
        <p>Start time: ${gathering.startTime.getDate()}.${gathering.startTime.getMonth()}.${gathering.startTime.getFullYear()} at ${gathering.startTime.getHours()}:${gathering.startTime.getMinutes()}.</p>
        <p>Attendants (${gathering.attendants.length})</p>
        <form data-gathering-id="${gathering.id}">
            <label for="${gathering.id}-attend-input">Name</label>
            <input
                id="${gathering.id}-attend-input"
                name="attendant"
                required />
            <button>Attend</button>
        </form>
        <div>
            ${gathering.attendants
        .map((attendant) => `<li>${attendant}</li>`)
        .join("\n")}
        </div>
`;
}
