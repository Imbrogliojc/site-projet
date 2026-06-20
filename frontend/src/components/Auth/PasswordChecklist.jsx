import { validatePassword } from "../../utils/validators/passwordValidator.js";

const PasswordChecklist = ({ password }) => {
  const { checks } = validatePassword(password);

  const rules = [
    {
      label: "Au moins 12 caractères",
      valid: checks.minLength
    },
    {
      label: "Une majuscule",
      valid: checks.hasUppercase
    },
    {
      label: "Une minuscule",
      valid: checks.hasLowercase
    },
    {
      label: "Un chiffre",
      valid: checks.hasNumber
    },
    {
      label: "Un caractère spécial",
      valid: checks.hasSpecialChar
    },
    {
      label: "Aucun chevron < >",
      valid: checks.hasNoChevron
    }
  ];

  return (
    <div className="small mt-2">
      {rules.map((rule) => (
        <div
          key={rule.label}
          className={rule.valid ? "text-success" : "text-danger"}
        >
          {rule.valid ? "✅" : "❌"} {rule.label}
        </div>
      ))}
    </div>
  );
};

export default PasswordChecklist;