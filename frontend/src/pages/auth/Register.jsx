// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../../api/api';

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!form.name || !form.email || !form.password) {
//       setError('Please fill all required fields');
//       return;
//     }
//     if (form.password !== form.confirm) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post('/user/register', {
//         name: form.name,
//         email: form.email,
//         phone: form.phone, // no validation per request
//         password: form.password,
//         role: 'CLIENT',
//       });
//       navigate('/login');
//     } catch (err) {
//       setError(err?.response?.data?.error || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };
// return (
//   <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-black px-4">
//     <div className="w-full max-w-lg relative">
      
//       {/* Glow effect */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>

//       <div className="relative bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        
//         <div className="text-center mb-8">
//           <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
//             CTS
//           </div>
//           <h2 className="text-3xl font-bold text-white mt-4">
//             Create your account
//           </h2>
//           <p className="text-slate-400 mt-2">
//             Start managing your tickets professionally
//           </p>
//         </div>

//         {error && (
//           <div className="mb-5 bg-red-500/10 border border-red-500/40 text-red-300 rounded-lg px-4 py-3 text-sm">
//             {error}
//           </div>
//         )}

//         <form className="space-y-5" onSubmit={submit}>

//           <div>
//             <label className="text-sm text-slate-400">Full Name</label>
//             <input
//               className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="John Doe"
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm text-slate-400">Email</label>
//             <input
//               type="email"
//               className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={e => setForm({ ...form, email: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm text-slate-400">Phone (optional)</label>
//             <input
//               className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="+91 98765 43210"
//               value={form.phone}
//               onChange={e => setForm({ ...form, phone: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-slate-400">Password</label>
//               <input
//                 type="password"
//                 className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={e => setForm({ ...form, password: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-sm text-slate-400">Confirm</label>
//               <input
//                 type="password"
//                 className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 placeholder="Repeat password"
//                 value={form.confirm}
//                 onChange={e => setForm({ ...form, confirm: e.target.value })}
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition disabled:opacity-60"
//           >
//             {loading ? 'Creating account...' : 'Create Account'}
//           </button>
//         </form>

//         <p className="text-center text-slate-400 text-sm mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-400 hover:text-indigo-300 font-semibold"
//           >
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   </div>
// );
// }

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.password) {
      setError('Please fill all required fields');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/user/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: 'CLIENT',
      });
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-950 to-black px-4">
      <div className="relative w-full max-w-lg">
        {/* Glow & Neon effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-40 animate-pulse"></div>

        <div className="relative bg-slate-900/80 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              CTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Create your account</h2>
            <p className="text-slate-400 mt-2">Start managing your tickets professionally</p>
          </div>

          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/40 text-red-300 rounded-lg px-4 py-3 text-sm animate-pulse">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={submit}>
            {/** Floating Label Inputs **/}
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Phone (optional)', key: 'phone', type: 'text', placeholder: '+91 98765 43210' }
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="relative">
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={key !== 'phone'}
                />
                <label className="absolute left-4 top-2 text-slate-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-400">
                  {label}
                </label>
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Password', 'Confirm'].map((field, idx) => {
                const key = field.toLowerCase();
                return (
                  <div key={key} className="relative">
                    <input
                      type="password"
                      value={form[idx === 0 ? 'password' : 'confirm']}
                      onChange={e => setForm({ ...form, [idx === 0 ? 'password' : 'confirm']: e.target.value })}
                      placeholder=" "
                      className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <label className="absolute left-4 top-2 text-slate-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-400">
                      {field}
                    </label>
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.03] transition transform disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
