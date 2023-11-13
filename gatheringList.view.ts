// how come we don't need to wrap renderGathering in a function?

import { Gathering, Gatherings } from "./gathering.model.js";
import { onSubmitAttendance } from "./gatheringList.controller.js";

export function renderGatheringList(
  gatherings: Gatherings,
  container: HTMLElement
) {
  container.innerHTML = `<ul>
            ${gatherings.map(renderGathering).join("\n")}
        </ul>`;

  container
    .querySelectorAll("form")
    .forEach((form) => form.addEventListener("submit", onSubmitAttendance));
}

function renderGathering(gathering: Gathering) {
  return `<li>
        <p><span>Title:</span> ${gathering.title}</p>
        <p>Duration: ${gathering.durationInHours} ${
          gathering.durationInHours === 1 ? "hour" : "hours"
        }.</p>
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
        <ul>
            ${gathering.attendants
              .map((attendant) => `<li>${attendant}</li>`)
              .join("\n")}
        </ul>
    </li>`;
}
