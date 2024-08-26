import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import Avatar from '../components/Avatar';
import { useNavigate } from 'react-router-dom';

export default function Account({ session }) {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;
        async function getProfile() {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setWebsite(data.website);
                    setAvatarUrl(data.avatar_url);
                }
            }

            setLoading(false);
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [session]);

    async function updateProfile(event, avatarUrl) {
        event.preventDefault();

        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            website,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            setAvatarUrl(avatarUrl);
        }
        setLoading(false);
    }

    return (
        <form onSubmit={updateProfile} style={styles.form}>
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                    updateProfile(event, url);
                }}
            />
            <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input id="email" type="text" value={session.user.email} disabled style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="username" style={styles.label}>Name</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="website" style={styles.label}>Website</label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.buttonGroup}>
                <button style={styles.primaryButton} type="submit" disabled={loading}>
                    {loading ? 'Loading ...' : 'Update'}
                </button>
                <button style={styles.secondaryButton} type="button" onClick={() => navigate("/home")}>
                    Home
                </button>
                <button style={styles.secondaryButton} type="button" onClick={() => supabase.auth.signOut()} disabled={false}>
                    Sign Out
                </button>
            </div>
        </form>
    );
}

const styles = {
    form: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    primaryButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    secondaryButton: {
        padding: '10px 20px',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};