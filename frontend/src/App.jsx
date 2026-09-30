import { useEffect, useMemo, useState } from "react";
import {
  Moon,
  Plus,
  Search,
  Sun,
  Users,
  X
} from "lucide-react";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser
} from "./services/userApi";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [formError, setFormError] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("user-app-theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("user-app-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  async function loadUsers() {
    setLoading(true);
    setPageError("");

    try {
      const response = await getUsers();
      setUsers(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      setPageError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function openAddForm() {
    setEditingUser(null);
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(user) {
    setEditingUser(user);
    setFormError("");
    setShowForm(true);
  }

  function closeForm() {
    if (submitting) return;
    setShowForm(false);
    setEditingUser(null);
    setFormError("");
  }

  async function handleSubmit(values) {
    setSubmitting(true);
    setFormError("");

    try {
      if (editingUser) {
        const response = await updateUser(editingUser.id, values);
        setUsers((current) =>
          current.map((user) =>
            user.id === editingUser.id ? response.data : user
          )
        );
      } else {
        const response = await createUser(values);
        setUsers((current) => [response.data, ...current]);
      }

      closeForm();
    } catch (error) {
      setFormError(error.message || "Unable to save user.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) return;

    setDeletingId(user.id);

    try {
      await deleteUser(user.id);
      setUsers((current) => current.filter((item) => item.id !== user.id));
    } catch (error) {
      window.alert(error.message || "Unable to delete user.");
    } finally {
      setDeletingId("");
    }
  }

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) =>
      [user.name, user.email, user.phone].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [users, search]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold sm:text-lg">User Management</h1>
              <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
                MERN Stack CRUD Application
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setDarkMode((value) => !value)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="btn-primary" onClick={openAddForm}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add User</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Dashboard
              </p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Manage your users
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Create, view, edit and delete users through a real Express and MongoDB API.
              </p>
            </div>

            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <div className="rounded-xl bg-indigo-50 p-2 dark:bg-indigo-950/50">
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Total users
                </p>
                <p className="text-xl font-extrabold">{users.length}</p>
              </div>
            </div>
          </div>
        </section>

        {showForm && (
          <section className="mb-8">
            <div className="mx-auto max-w-2xl">
              {formError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                  {formError}
                </div>
              )}
              <UserForm
                editingUser={editingUser}
                onSubmit={handleSubmit}
                onCancel={closeForm}
                submitting={submitting}
              />
            </div>
          </section>
        )}

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold">Users</h3>
              {!loading && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Showing {filteredUsers.length} of {users.length}
                </p>
              )}
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="input pl-10 pr-10"
                placeholder="Search name, email or phone..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : pageError ? (
            <ErrorMessage message={pageError} onRetry={loadUsers} />
          ) : filteredUsers.length === 0 ? (
            <EmptyState hasSearch={Boolean(search.trim())} onAdd={openAddForm} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
        MERN User Management • Interview Assignment
      </footer>
    </div>
  );
}

export default App;