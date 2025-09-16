import { AgentGetOne } from '../../types/types';

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export function AgentForm() {
  return <div>AgentForm</div>;
}
