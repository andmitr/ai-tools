export const SkillReminderPlugin = async (ctx) => {
  return {
    'chat.message': async (input, output) => {
      if (output.message.role === 'user') {
        const reminderText = '\nBefore responding, scan <available_skills>. Call "skill" tool for EVERY matching skill. Output "skills checked" at the start of your response, only if you actually performed the scan.'
        output.parts.forEach(part => {
          if (part.type === 'text') {
            part.text += reminderText
          }
        })
      }
    }
  }
}