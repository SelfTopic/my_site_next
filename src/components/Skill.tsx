const Skills = () => {
  const skills = ["Node.js", "Python", "SQL", "Docker", "WebSocket", "REST API"] as const;

  return (
    <section className="skills">
      <h2>Мои навыки</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill} className="skill-card">
            <h3>{skill}</h3>
            <p>Опыт работы с {skill} в реальных проектах.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;