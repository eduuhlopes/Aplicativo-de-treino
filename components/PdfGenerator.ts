import { WorkoutPlan, UserProfile } from '../types';

declare const jspdf: any;

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const generatePdf = (plan: WorkoutPlan, user: UserProfile) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4'
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;
  let pageNumber = 1;

  const addPageNumber = () => {
    doc.setFontSize(8);
    doc.text(`Página ${pageNumber}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  const checkPageBreak = (spaceNeeded: number) => {
    if (y + spaceNeeded > pageHeight - margin) {
      addPageNumber();
      doc.addPage();
      y = margin;
      pageNumber++;
    }
  };

  // Título do Documento
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('Plano de Treino Personalizado', pageWidth / 2, y, { align: 'center' });
  y += 10;
  
  // Informações do Usuário
  const age = calculateAge(user.dob);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Para: ${user.name} (Idade: ${age} anos)`, pageWidth / 2, y, { align: 'center' });
  y += 15;


  plan.workoutPlan.forEach((day, dayIndex) => {
    checkPageBreak(20); // Espaço para o cabeçalho do dia
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`${day.day}: ${day.focus}`, margin, y);
    y += 8;

    checkPageBreak(10);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(`Dica: ${day.daySummary}`, pageWidth - margin * 2);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4 + 5;

    day.exercises.forEach((exercise) => {
      checkPageBreak(35); // Estimativa de espaço para um bloco de exercício
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(exercise.name, margin, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const details = [
        `Séries/Repetições: ${exercise.reps}`,
        `Descanso: ${exercise.rest}`,
        `Equipamento: ${exercise.equipment}`,
        `Músculos: ${exercise.musclesWorked}`
      ];
      
      details.forEach(detail => {
          checkPageBreak(5);
          doc.text(detail, margin + 5, y);
          y += 5;
      });

      checkPageBreak(5);
      doc.text('Descrição:', margin + 5, y);
      y += 5;

      const descriptionLines = doc.splitTextToSize(exercise.description, pageWidth - (margin * 2 + 10));
      checkPageBreak(descriptionLines.length * 4 + 8);
      doc.text(descriptionLines, margin + 10, y);
      y += descriptionLines.length * 4 + 8; // Espaço extra após cada exercício
    });
    
    if (dayIndex < plan.workoutPlan.length - 1) {
        y += 5; // Espaço extra entre os dias
    }
  });
  
  addPageNumber();
  doc.save('plano-de-treino.pdf');
};