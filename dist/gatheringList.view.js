// how come we don't need to wrap renderGathering in a function?
import { onSubmitAttendance } from "./gatheringList.controller.js";
import { createGathering } from "./gathering.model.js";
const addGatherBtn = document.createElement("button");
addGatherBtn.textContent = "+create new Gather";
const newGatheringForm = document.createElement("form");
let br = document.createElement("br");
document.querySelector("#header")?.appendChild(newGatheringForm);
const newGatheringFormTitleTag = document.createElement("label");
newGatheringFormTitleTag.innerHTML = "Title:";
const newGatheringFormTitle = document.createElement("input");
newGatheringFormTitle.setAttribute("name", "title");
const newGatheringFormLocationTag = document.createElement("label");
newGatheringFormLocationTag.innerHTML = "Location:";
const newGatheringFormLocation = document.createElement("input");
newGatheringFormLocation.setAttribute("name", "location");
const newGatheringFormStartTimeTag = document.createElement("label");
newGatheringFormStartTimeTag.innerHTML = "Start time:";
const newGatheringFormStartTime = document.createElement("input");
newGatheringFormStartTime.setAttribute("type", "datetime-local");
newGatheringFormStartTime.setAttribute("name", "start_time");
const newGatheringFormdurationInHoursTag = document.createElement("label");
newGatheringFormdurationInHoursTag.innerHTML = "Duration in hours:";
const newGatheringFormdurationInHours = document.createElement("input");
newGatheringFormdurationInHours.setAttribute("name", "duration_hours");
newGatheringFormdurationInHours.setAttribute("type", "number");
newGatheringFormdurationInHours.setAttribute("step", "0.1");
const newGatheringFormOrganizerTag = document.createElement("label");
newGatheringFormOrganizerTag.innerHTML = "Organizer:";
const newGatheringFormOrganizer = document.createElement("input");
newGatheringFormOrganizer.setAttribute("name", "organizer");
const newGatheringFormParticipantLimitTag = document.createElement("label");
newGatheringFormParticipantLimitTag.innerHTML = "Participant limit:";
const newGatheringFormParticipantLimit = document.createElement("input");
newGatheringFormParticipantLimit.setAttribute("name", "participant_limit");
const newGatheringFormDescriptionTag = document.createElement("label");
newGatheringFormDescriptionTag.innerHTML = "Description:";
const newGatheringFormDescription = document.createElement("input");
newGatheringFormDescription.setAttribute("name", "description");
let btnTag = document.createElement("label");
let submitBtn = document.createElement("button");
btnTag.innerHTML = "Submit";
submitBtn.appendChild(btnTag);
newGatheringForm.appendChild(newGatheringFormTitleTag);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormTitle);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormLocationTag);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormLocation);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormStartTimeTag);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormStartTime);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormdurationInHoursTag);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormdurationInHours);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormOrganizerTag);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormOrganizer);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormParticipantLimitTag);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormParticipantLimit);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormDescriptionTag);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(newGatheringFormDescription);
newGatheringForm.appendChild(br.cloneNode());
newGatheringForm.appendChild(submitBtn);
newGatheringForm.style.display = "none";
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(newGatheringForm);
    const gathering = {
        id: "",
        title: formData.get("title"),
        location: formData.get("location"),
        startTime: new Date(formData.get("start_time")),
        durationInHours: parseFloat(formData.get("duration_hours")),
        participantLimit: parseInt(formData.get("participant_limit"), 10),
        organizer: formData.get("organizer"),
        attendants: [],
        description: formData.get("description"),
    };
    newGatheringForm.style.display = "none";
    newGatheringForm.reset();
    addGatherBtn.textContent = "+create new Gather";
    createGathering(gathering);
});
addGatherBtn.addEventListener("click", (e) => {
    if (newGatheringForm.style.display === 'none' || newGatheringForm.style.display === '') {
        newGatheringForm.style.display = 'block';
        addGatherBtn.textContent = "Close form.";
    }
    else {
        newGatheringForm.style.display = 'none';
        addGatherBtn.textContent = "+create new Gather";
    }
});
document.querySelector("#header")?.appendChild(addGatherBtn);
//=====================
// ==============================??
function attedantsForm(gathering) {
    if (gathering.attendants.length < gathering.participantLimit) {
        return `<form data-gathering-id="${gathering.id}">
            <label for="${gathering.id}-attend-input">Name</label>
            <input
                id="${gathering.id}-attend-input"
                name="attendant"
                required />
            <button>Attend</button>
        </form>`;
    }
    else {
        return `The list of attendants is closed.`;
    }
}
export function renderGatheringList(gatherings, container) {
    container.innerHTML = `<div class='elements'>
            ${gatherings.map(renderGathering).join("\n")}
        </div>`;
    container
        .querySelectorAll("form")
        .forEach((form) => form.addEventListener("submit", onSubmitAttendance));
}
function renderGathering(gathering) {
    return `<div> 
          <p class="gatheringElements"><span>Title:</span> ${gathering.title}</p>
        <p>Duration: ${gathering.durationInHours} ${gathering.durationInHours === 1 ? "hour" : "hours"}.</p>
        <p> Location: ${gathering.location}.</p>
        <p> Organizer: ${gathering.organizer}.</p>
        <p>Start time: ${gathering.startTime.getDate()}.${gathering.startTime.getMonth()}.${gathering.startTime.getFullYear()} at ${gathering.startTime.getHours()}:${gathering.startTime.getMinutes()}.</p>
        <p>Attendants (${gathering.attendants.length})</p>
        
        <div>
            ${gathering.attendants
        .map((attendant) => `<li>${attendant}</li>`)
        .join("\n")}
        </div>
        ${attedantsForm(gathering)}

    </div>
`;
}
