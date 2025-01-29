# Security Policy

## Reporting Vulnerabilities

The security of the "Sua Finança" project is a priority for us. If you find a security vulnerability, please follow the steps below to report it:

1. **Send an Email**: Report the vulnerability by sending an email to [your-email@domain.com]. Include as many details as possible, such as:
   - Description of the vulnerability.
   - Steps to reproduce the issue.
   - Potential impact of the vulnerability.
   - Any other relevant information.

2. **Response Time**: We commit to responding within 5 business days to acknowledge receipt of the report. We will do our best to provide an initial response within 10 business days, including an assessment of the vulnerability and an estimated date for a fix.

3. **Responsible Disclosure**: We ask that you do not publicly disclose the vulnerability until we have had the opportunity to investigate and mitigate the issue. We will work with you to ensure that the vulnerability is resolved before any public disclosure.

## Security Best Practices

To ensure the ongoing security of the project, we follow these practices:

- **Secure Authentication**: We use JWT for authentication and Bcrypt for password hashing.
- **Data Validation**: We use Zod to validate all data inputs.
- **Dependency Management**: We keep our dependencies up to date and use tools like Dependabot to monitor vulnerabilities.
- **Secure Configuration**: We use environment variables to manage sensitive configurations and avoid exposing sensitive information in the source code.
- **Security Testing**: We conduct regular security tests, including penetration testing and vulnerability analysis.

## Contact

If you have any questions or concerns about the security of the project, please contact us at [your-email@domain.com].
