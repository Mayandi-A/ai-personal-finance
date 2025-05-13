import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Helper function to format INR
const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "Mayandi",
    type: "monthly-report",
    data: {
      month: new Date().toLocaleString('default', { month: 'long' }),
      stats: {
        totalIncome: 500000,
        totalExpenses: 350000,
        byCategory: {
          housing: 150000,
          groceries: 60000,
          transportation: 40000,
          entertainment: 30000,
          utilities: 70000,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "Mayandi",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 400000,
      totalExpenses: 340000,
    },
  },
};

export default function EmailTemplate({
  userName = "Mayandi",
  type = "monthly-report",
  data,
}) {
  const finalData = data || PREVIEW_DATA[type]?.data || {};

  if (type === "monthly-report") {
    const stats = finalData?.stats || {};
    const totalIncome = Number(stats.totalIncome || 0);
    const totalExpenses = Number(stats.totalExpenses || 0);
    const net = totalIncome - totalExpenses;

    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here&rsquo;s your financial summary for{" "}
              {finalData?.month || "this month"}:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>{formatINR(totalIncome)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>{formatINR(totalExpenses)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>{formatINR(net)}</Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {stats.byCategory && Object.keys(stats.byCategory).length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(stats.byCategory).map(([category, amount]) => (
                  <div key={category} style={styles.row}>
                    <Text style={styles.text}>{category}</Text>
                    <Text style={styles.text}>{formatINR(amount)}</Text>
                  </div>
                ))}
              </Section>
            )}

            {/* AI Insights */}
            {finalData?.insights && finalData.insights.length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Welth Insights</Heading>
                {finalData.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Welth. Keep tracking your finances for better
              financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    const percentageUsed = Number(finalData?.percentageUsed || 0);
    const budgetAmount = Number(finalData?.budgetAmount || 0);
    const totalExpenses = Number(finalData?.totalExpenses || 0);
    const remaining = budgetAmount - totalExpenses;

    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You&rsquo;ve used {percentageUsed.toFixed(1)}% of your monthly
              budget.
            </Text>

            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>{formatINR(budgetAmount)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>{formatINR(totalExpenses)}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>{formatINR(remaining)}</Text>
              </div>
            </Section>

            <Text style={styles.footer}>
              Thank you for managing your finances with Welth.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  return null;
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    margin: "0 0 16px",
  },
  section: {
    marginTop: "32px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  statsContainer: {
    margin: "32px 0",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "16px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
  },
};
