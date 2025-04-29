
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-minecraft-darker text-white">
          <div className="glass-card p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-minecraft text-minecraft-primary mb-4">Bir Hata Oluştu</h2>
            <p className="text-muted-foreground mb-6">
              Üzgünüz, bir sorun oluştu. Lütfen sayfayı yenilemeyi deneyin.
            </p>
            <Button onClick={this.handleReload} className="minecraft-btn">
              <RefreshCw className="mr-2 h-4 w-4" />
              <span className="btn-content">Sayfayı Yenile</span>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
