import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AcademyGroup, Member } from '../services/api/members';
import { getSlotDisplayName } from './academyUtils';

type AcademyType = 'ACADEMY_BEGINNER' | 'ACADEMY_INTERMEDIATE';

interface DownloadAcademyAssistanceDocumentParams {
  academyType: AcademyType;
  group: AcademyGroup | 'INTERMEDIATE_FRIDAY_6_8';
  members: Member[];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function downloadAcademyAssistanceDocument({
  academyType,
  group,
  members,
}: DownloadAcademyAssistanceDocumentParams): void {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const title = `Assistance document - ${getSlotDisplayName(group)}`;
  const fileName = `academy-assistance-${slugify(academyType)}-${slugify(getSlotDisplayName(group))}.pdf`;
  const rows = members.map(member => [(`${member.name} ${member.surname}`).trim(), '[ ]']);
  const hasMembers = rows.length > 0;

  pdf.setFontSize(16);
  pdf.text(title, 14, 18);
  pdf.setFontSize(10);
  pdf.text(`Group: ${getSlotDisplayName(group)}`, 14, 26);
  if (!hasMembers) {
    pdf.text('No members in this group', 14, 34);
  }

  autoTable(pdf, {
    startY: hasMembers ? 32 : 38,
    head: [['Name', 'Assisted']],
    body: rows,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'middle',
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
    },
    columnStyles: {
      1: { halign: 'center', cellWidth: 28 },
    },
  });

  pdf.save(fileName);
}
