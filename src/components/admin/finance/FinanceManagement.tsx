import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Euro } from 'lucide-react';
import { getCurrentFinance, FinanceResponse } from '../../../services/api/finances';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorAlert } from '../../ui/ErrorAlert';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const getBalanceColor = (amount: number): string => {
  if (amount >= 0) {
    return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
  }
  return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
};

const getTextColor = (amount: number): string => {
  if (amount >= 0) {
    return 'text-green-700 dark:text-green-400';
  }
  return 'text-red-700 dark:text-red-400';
};

export function FinanceManagement() {
  const [finance, setFinance] = useState<FinanceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinance();
  }, []);

  const fetchFinance = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentFinance();
      setFinance(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error loading finance data'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert title="Error" message={error} />;
  }

  if (!finance) {
    return <ErrorAlert title="Error" message="No finance data available" />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Finanzas
      </h2>

      {/* Total Balance Card */}
      <div className="mb-8">
        <div
          className={`rounded-xl shadow-md p-6 border-2 ${getBalanceColor(
            finance.totalBalance
          )}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Balance Total:
              </p>
              <p
                className={`text-3xl font-bold ${getTextColor(
                  finance.totalBalance
                )}`}
              >
                {formatCurrency(finance.totalBalance)}
              </p>
            </div>
            <div>
              {finance.totalBalance >= 0 ? (
                <TrendingUp className="w-10 h-10 text-green-500 flex-shrink-0" />
              ) : (
                <TrendingDown className="w-10 h-10 text-red-500 flex-shrink-0" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Income and Expenses Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Income Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Ingresos (Mes Actual)
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                Total de Ingresos
              </p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {formatCurrency(finance.income.total)}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                Total de Socios
              </p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {finance.income.memberCount}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Desglose de Ingresos:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-700 dark:text-gray-300">Socios No Federados</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(finance.income.breakdown.casual)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-700 dark:text-gray-300">
                  Academia Iniciación
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(
                    finance.income.breakdown.academyBeginner
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-700 dark:text-gray-300">
                  Academia Tecnificación
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(
                    finance.income.breakdown.academyIntermediate
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-700 dark:text-gray-300">
                  Federados
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(finance.income.breakdown.competition)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3">
              <TrendingDown className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Gastos Previstos (Mes Actual)
              </h3>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800 mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
              Total de Gastos
            </p>
            <p className="text-3xl font-bold text-red-700 dark:text-red-400">
              -{formatCurrency(finance.expenses.total)}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Desglose de Gastos:
            </p>
            {finance.expenses.breakdown ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">Felipe Academia</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    -{formatCurrency(finance.expenses.breakdown.BeginnerCoaching)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">
                    Exposito Tecnificación
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    -{formatCurrency(finance.expenses.breakdown.IntermediateCoaching)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-700 dark:text-gray-300">
                    Exposito Federados
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    -{formatCurrency(finance.expenses.breakdown.CompetitionCoaching)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Desglose no disponible
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
