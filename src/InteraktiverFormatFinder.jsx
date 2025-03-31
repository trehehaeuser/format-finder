import { useState, useEffect } from 'react'
import './styles/formatfinder.css'
import './styles/fonts.css'


const data = {
  step1: [
    "Ich habe eine Frage, die mich nicht loslässt.",
    "Ich stecke fest – innerlich oder äußerlich.",
    "Ich suche Klarheit für eine Entscheidung.",
    "Ich fühle mich leer, orientierungslos, abgeschnitten.",
    "Ich sehne mich nach Verbindung, die echt ist.",
    "Ich will nicht mehr funktionieren – sondern wieder fühlen.",
    "Ich spüre, dass etwas in Bewegung kommen will – aber weiß nicht wie."
  ],
  step2_1: [
    "Orientierung", "Resonanz", "Rückzug", "Entscheidungskraft",
    "Klarheit", "Bewegung / Veränderung"
  ],
  step2_2: [
    "Am Anfang – ich taste mich erst vor",
    "In der Krise – ich brauche Halt",
    "An einer Schwelle – etwas will sich verändern",
    "Im Übergang – ich will Altes würdigen und Neues finden",
    "In der Tiefe – ich will weitergraben"
  ],
  step2_3: [
    "Ich brauche erst mal Raum für mich",
    "Ich bin bereit für Austausch mit anderen",
    "Ich will mich zeigen – ohne Maske",
    "Ich suche ein Gegenüber, das mit mir denkt"
  ],
  step3: [
    "Ich will Klarheit – aber in meinem Tempo. Am liebsten schreibend, ohne direkten Kontakt.",
    "Ich wünsche mir jemanden, der mit mir denkt – nicht für mich. Im echten Gespräch.",
    "Ich will raus aus dem Alltag. Stille. Raum. Rückzug, um mich wieder zu spüren.",
    "Ich will mit anderen denken. Hören, was sie bewegt – und was in mir anklingt.",
    "Ich will schriftlich in Kontakt kommen – nicht allein, aber ohne reden zu müssen.",
    "Ich bin noch unsicher – ich will entdecken."
  ],
  step6: [
    "Ich bin Mann und suche Austausch unter Männern",
    "Ich bin LehrerIn oder LernbegleiterIn",
    "Ich habe Führungsverantwortung",
    "Ich bin Moderator, Trainer, Coach, Mentor oder Berater",
    "Keines davon"
  ]
}

const formatLinks = {
  "Sokratische Schreibwerkstatt": "https://www.institut-neue-sokratische-dialoge.de/sokratische-schreibwerkstatt",
  "Sokratisches Mentoring": "https://www.institut-neue-sokratische-dialoge.de/sokratisches-mentoring",
  "Ich bin – Tagesretreat": "https://www.institut-neue-sokratische-dialoge.de/retreat",
  "Sokratisches Gespräch Online": "https://www.institut-neue-sokratische-dialoge.de/sokratisches-gespraech-online",
  "Sokratischer Konvent": "https://www.institut-neue-sokratische-dialoge.de/konvent",
  "Entdeckungspfad: mehrere Formate zur Auswahl": "https://www.institut-neue-sokratische-dialoge.de/formate",
  "Sokratischer Männerkreis Online": "https://www.institut-neue-sokratische-dialoge.de/maennerkreis",
  "Sokratischer Lehrerkreis Online": "https://www.institut-neue-sokratische-dialoge.de/lehrerkreis",
  "Sokratischer Führungskreis Online": "https://www.institut-neue-sokratische-dialoge.de/fuehrungskreis",
  "Dialog- und Qigong-Retreat": "https://www.institut-neue-sokratische-dialoge.de/dialog-und-qigong-retreat",
  "Neuer Sokratischer Dialog im Norden": "https://www.institut-neue-sokratische-dialoge.de/dialog-im-norden",
  "Neuer Sokratischer Dialog vor Ort": "https://www.institut-neue-sokratische-dialoge.de/dialog-vor-ort",
  "Neuer Sokratischer Dialog als Teil deiner Veranstaltung": "https://www.institut-neue-sokratische-dialoge.de/dialog-in-veranstaltung"
}

const formatDescriptions = {
  "Sokratische Schreibwerkstatt": "Dein innerer Kompass in Worten – Klarheit im Schreiben, ohne äußeren Druck.",
  "Sokratisches Mentoring": "Individuelles Denk- und Gesprächsformat für echte Klarheit in komplexen Fragen.",
  "Ich bin – Tagesretreat": "Ein Raum zum Rückzug, Spüren und Wandeln – mit Bewegung, Dialog und Natur.",
  "Sokratisches Gespräch Online": "Gemeinsames Denken auf Augenhöhe – online, strukturiert und tiefgehend.",
  "Sokratischer Konvent": "In Resonanz mit anderen – Raum für Präsenz, Austausch und das Wesentliche.",
  "Sokratischer Männerkreis Online": "Für Männer, die sich zeigen wollen – ehrlich, verletzlich, kraftvoll.",
  "Sokratischer Lehrerkreis Online": "Für LernbegleiterInnen, die sich Raum nehmen zum Denken, Hören, Verstehen.",
  "Sokratischer Führungskreis Online": "Reflexionsraum für Menschen mit Verantwortung – jenseits von Businessroutinen.",
  "Neuer Sokratischer Dialog im Norden": "Still. Echt. Tief. Ein Dialogformat an einem Ort, der Weite schenkt.",
  "Neuer Sokratischer Dialog vor Ort": "Bringe Denkraum in deine Region – mit Tiefe, Struktur und Präsenz.",
  "Neuer Sokratischer Dialog als Teil deiner Veranstaltung": "Verwandle Events in echte Resonanzräume mit Substanz.",
  "Dialog- und Qigong-Retreat": "Die Kraft aus Bewegung und Dialog – Retreat für Körper, Geist und Wandel.",
  "Entdeckungspfad: mehrere Formate zur Auswahl": "Du bist eingeladen, weiter zu entdecken – in deinem Tempo."
}


function getFormats(step3 = "", step2_1 = "", step2_2 = "", step2_3 = "", step6 = "", step1 = []) {
  const formats = []

  if (step3.includes("schreibend")) formats.push("Sokratische Schreibwerkstatt")
  if (step3.includes("Gespräch")) formats.push("Sokratisches Mentoring")
  if (step3.includes("Rückzug")) formats.push("Ich bin – Tagesretreat")
  if (step3.includes("anderen denken")) formats.push("Sokratisches Gespräch Online")
  if (step3.includes("schriftlich in Kontakt")) formats.push("Sokratischer Konvent")
  if (step3.includes("unsicher")) formats.push("Entdeckungspfad: mehrere Formate zur Auswahl")

  if (step6.includes("Mann") && step2_1 === "Resonanz" && step2_3 === "Ich will mich zeigen – ohne Maske") {
    formats.push("Sokratischer Männerkreis Online")
  }
  if (step6.includes("LehrerIn")) formats.push("Sokratischer Lehrerkreis Online")
  if (step6.includes("Führungsverantwortung") && step2_1 === "Entscheidungskraft") formats.push("Sokratischer Führungskreis Online")
  if (step2_1 === "Rückzug" && (step2_2 === "Im Übergang – ich will Altes würdigen und Neues finden" || step2_2 === "In der Tiefe – ich will weitergraben")) {
    formats.push("Dialog- und Qigong-Retreat")
  }
  if (step2_1 === "Rückzug" && step2_2 === "Im Übergang – ich will Altes würdigen und Neues finden" && step2_3 === "Ich brauche erst mal Raum für mich") {
    formats.push("Neuer Sokratischer D
