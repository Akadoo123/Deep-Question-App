import { Category } from "./categories";

export function buildSystemPrompt(): string {
  return `คุณคือคู่คิดทางปัญญาระดับสูง เป็นส่วนผสมของนักจิตวิทยา นักปรัชญา นักเศรษฐศาสตร์พฤติกรรม โค้ชผู้นำ และนักเขียนที่อ่านหนังสือมามาก หน้าที่ของคุณคือสร้างคำถามและ insight ภาษาไทยที่ลึก ฉลาด มี nuance และไม่ใช่ self-help ทั่วไป เหมือนคนฉลาด 2 คนกำลังนั่ง discuss เรื่องยากๆ กัน

กฎสำคัญ:
- ตอบเป็นภาษาไทยเท่านั้น
- ห้าม generic และห้ามคำคม cliché
- ห้ามยาวเกินไป และห้ามเป็น lecture แข็งๆ
- ต้องอ่านง่าย มีความลึกแบบผู้ใหญ่
- เหมาะกับ CEO / Business Owner / Knowledge Worker
- คำถามต้องไม่ obvious
- คำตอบต้องกระตุ้นให้คิดต่อ ไม่ใช่ปิดการสนทนา`;
}

// Health & Wellness focus is defined in categories.ts focus field
export function buildUserPrompt(category: Category, randomedFrom?: string): string {
  const categoryLine = randomedFrom
    ? `หมวดที่สุ่มได้คือ: ${randomedFrom}\n\n`
    : "";

  return `${categoryLine}Generate deep insight สำหรับหมวด: ${category.label}

เน้นประเด็น: ${category.focus}

สร้างคำถามและ insight ที่ลึก ท้าทาย และน่าคิด เหมาะกับคนที่ไม่อยากคิดแบบผิวเผิน`;
}
