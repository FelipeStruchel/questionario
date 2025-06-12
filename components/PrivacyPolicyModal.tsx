import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

interface PrivacyPolicyModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function PrivacyPolicyModal({ visible, onAccept, onDecline }: PrivacyPolicyModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme !== 'light'; // dark mode por padrão

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, isDark && styles.modalDark]}>
          <Text style={[styles.title, isDark && styles.titleDark]}>Política de Privacidade</Text>
          <ScrollView style={{ maxHeight: 350 }} contentContainerStyle={{ paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
            <Text style={[styles.text, isDark && styles.textDark]}>
Objetivo e coleta de informações: O aplicativo Ecologiapp é apenas um questionário virtual com o objetivo de realizar a medição do impacto do usuário ao meio ambiente, o aplicativo não faz nenhum armazenamento e compartilhamento de dados pessoais com terceiros.{"\n\n"}
Uso de Recursos do Dispositivo: O Ecologiapp tem como opção salvar o resultado final do questionário no próprio dispositivo do usuário, o usuário poderá ver o resultado final ao acessar a aba "Histórico" e também poderá apagá-lo do próprio dispositivo, sendo assim, não há nenhum tratamento de dados. O aplicativo não exige nenhum tipo de acesso a recursos como: câmeras, localização, microfone, contatos, SMS, calendário ou sensores.{"\n\n"}
Cookies e Tecnologias de Rastreamento: O Ecologiapp não utiliza cookies, SDKs de anúncios, bibliotecas de analytics nem quaisquer tecnologias de rastreamento.{"\n\n"}
Compartilhamento de Informações: Como não há coleta de dados, nenhuma informação é compartilhada com terceiros. O aplicativo não se conecta a servidores nem a APIs externas.{"\n\n"}
Segurança do Aplicativo: Embora não haja coleta ou armazenamento de dados, mantemos boas práticas de segurança de código: Assinatura digital do pacote (AAB) para garantir integridade; Ofuscação de código para reduzir risco de engenharia reversa.{"\n\n"}
Links Externos: Todo o conteúdo (abas Prevenções e Cuidados) é exibido internamente. Não existem links externos. Caso versões futuras incluam redirecionamentos, eles serão claramente sinalizados e abrirão no navegador padrão.{"\n\n"}
Alterações nesta Política: Esta Política poderá ser atualizada periodicamente. A versão mais recente estará disponível na página do aplicativo na Google Play. O uso continuado após alterações implicará aceite dos novos termos.
            </Text>
          </ScrollView>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.accept]} onPress={onAccept}>
              <Text style={styles.buttonText}>Aceitar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.decline]} onPress={onDecline}>
              <Text style={styles.buttonText}>Negar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    maxWidth: 420,
    width: '100%',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalDark: {
    backgroundColor: '#181A20',
    shadowColor: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#222',
  },
  titleDark: {
    color: '#fff',
  },
  text: {
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'justify',
    color: '#222',
    lineHeight: 22,
  },
  textDark: {
    color: '#e0e0e0',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  decline: {
    backgroundColor: '#f44336',
    marginLeft: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
}); 