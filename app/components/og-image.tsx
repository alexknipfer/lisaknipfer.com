interface Props {
  title: string;
  description: string | null;
}

export function OpenGraphImage({ title, description }: Props) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
          backgroundImage:
            'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '80%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span
            style={{
              fontSize: '5.25rem',
              lineHeight: 1,
              fontWeight: 600,
              color: '#be185d',
            }}
          >
            {title}
          </span>
        </div>
        {description && <span style={{ fontSize: '2rem' }}>{description}</span>}
      </span>
    </div>
  );
}
