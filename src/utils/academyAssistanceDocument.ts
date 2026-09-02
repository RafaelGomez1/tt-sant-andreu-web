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

function translateSlotNameToSpanish(displayName: string): string {
  const translations: Record<string, string> = {
    'Monday': 'Lunes',
    'Wednesday': 'Miércoles',
    'Friday': 'Viernes',
  };

  let result = displayName;
  Object.entries(translations).forEach(([eng, spa]) => {
    result = result.replace(new RegExp(`\\b${eng}\\b`), spa);
  });
  return result;
}

export function downloadAcademyAssistanceDocument({
  academyType,
  group,
  members,
}: DownloadAcademyAssistanceDocumentParams): void {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const displayName = getSlotDisplayName(group);
  const groupName = translateSlotNameToSpanish(displayName);
  const title = `Documento de asistencia`;
  const fileName = `documento-asistencia-${slugify(academyType)}-${slugify(displayName)}.pdf`;
  const rows = members.map(member => [(`${member.name} ${member.surname}`).trim(), '[ ]']);
  const hasMembers = rows.length > 0;

  const pageWidth = pdf.internal.pageSize.getWidth();

  pdf.setFontSize(16);
  pdf.text(title, pageWidth / 2, 18, { align: 'center' });

  pdf.setFontSize(10);
  pdf.text('Fecha de la sesión:', 14, 28);
  pdf.rect(50, 25.5, 50, 5);
  pdf.text('_____________________', 50, 30);

  let tableStartY = 36;

  if (!hasMembers) {
    pdf.text('No hay miembros en este grupo', 14, tableStartY);
    tableStartY += 6;
  }

  autoTable(pdf, {
    startY: tableStartY,
    head: [['Nombre', 'Asistencia']],
    body: rows,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 2.5,
      valign: 'middle',
      lineWidth: 0.1,
      lineColor: [180, 180, 180],
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontStyle: 'bold',
      lineWidth: 0.1,
      lineColor: [180, 180, 180],
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'center', cellWidth: 24 },
    },
  });

  pdf.save(fileName);
}
