import $ from "jquery";

const SUBJECT_NAME_MINIMUM = { height: 70, width: 50 };
const CLASS_LOCATION_MINIMUM = { height: 0, width: 90 };
const CLASS_TYPE_MINIMUM = { height: 0, width: 120 };

/**
 * Handles the rendering of the class event on the timetable viewer.
 * @param {EventApi} event The FullCalendar Event Object of relevance
 * @param {HTMLElement} el The corresponsind HTMLElement to
 */
export default function({ event, el }) {
  const content = $(el);
  // Size information of the current class
  const height = content.height();
  const width = content.width();
  // Class-specific information is stored in extended props
  const { subjectName, code, type, locations } = event.extendedProps;

  // HTML Element for the bottom elements (Subject Name + Code)
  const bottomWrapper = $('<div class="bottom-wrapper"/>');
  // Render subject name, e.g. "Software Modelling and Design" - if allowed
  if (
    height >= SUBJECT_NAME_MINIMUM.height &&
    width >= SUBJECT_NAME_MINIMUM.width
  ) {
    const subjectNameText = $(`<div class="fc-desc">${subjectName}</div>`);
    subjectNameText.appendTo(bottomWrapper);
  }
  // Render number of locations available - if allowed
  if (
    height >= CLASS_LOCATION_MINIMUM.height &&
    width >= CLASS_LOCATION_MINIMUM.width
  ) {
    const locationsText = $(
      `<div class="fc-loc">${locations} location${
        locations > 1 ? "s" : ""
      }</div>`
    );
    locationsText.appendTo(content);
  }
  // Render type of class text (Stream, Mandatory, Variable) - if allowed
  if (
    height >= CLASS_TYPE_MINIMUM.height &&
    width >= CLASS_TYPE_MINIMUM.width
  ) {
    const subjectCodeText = $(`<div class="fc-type">${type}</div>`);
    subjectCodeText.appendTo(content);
  }
  // Render the subject code all the time
  const subjectCode = $(`<div class="fc-code">${code}</div>`);
  subjectCode.appendTo(bottomWrapper);
  // Add the bottom wrapper to the calendar element
  bottomWrapper.appendTo(content);
  let iconMapping = {
    Mandatory: "lock",
    Variable: "exchange-alt",
    Stream: "water"
  };
  const lockElement = $(
    `<i class="fa fa-${iconMapping[type]} fa-fw event-icon"/i>`
  );
  lockElement.appendTo(content);
}