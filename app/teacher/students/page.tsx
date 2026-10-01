import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { Badge } from "@/components/ui/badge"

export default function TeacherStudentsPage() {
  const students: any[] = []

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <TeacherSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Course Student Rosters</h1>
          <p className="text-sm text-[#7a7a7a] mt-0.5">
            Monitor real-time progress, assessment metrics, and learner engagement across assigned classes.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          {students.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-base font-semibold text-[#1d1d1f]">No Students Assigned</h3>
              <p className="text-sm text-[#7a7a7a] mt-1 max-w-sm mx-auto">
                No students are currently enrolled in your assigned courses. Cohort enrollments managed by administration will display here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafafc] border-b border-[#e5e5e7] text-[#7a7a7a] text-xs font-medium uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Enrolled Student</th>
                  <th className="py-3.5 px-6">Curriculum Progress</th>
                  <th className="py-3.5 px-6">Assignments Completed</th>
                  <th className="py-3.5 px-6">Quiz Average</th>
                  <th className="py-3.5 px-6">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f2]">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-[#fafafc] transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#1d1d1f]">
                      <p>{s.name}</p>
                      <p className="text-xs text-[#7a7a7a] font-normal">{s.email}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-[#0066cc]">{s.courseProgress}</span>
                    </td>
                    <td className="py-4 px-6 text-[#1d1d1f]">{s.completedAssignments}</td>
                    <td className="py-4 px-6 font-mono text-emerald-600 font-semibold">{s.averageQuizScore}</td>
                    <td className="py-4 px-6">
                      <Badge variant="success">{s.standing}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
